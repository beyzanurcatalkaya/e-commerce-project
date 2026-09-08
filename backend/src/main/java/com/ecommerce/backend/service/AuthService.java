package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.request.SignupRequest;
import com.ecommerce.backend.dto.request.LoginRequest;
import com.ecommerce.backend.dto.response.RoleResponse;
import com.ecommerce.backend.dto.response.UserResponse;
import com.ecommerce.backend.entity.Role;
import com.ecommerce.backend.entity.Store;
import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.exception.ConflictException;
import com.ecommerce.backend.exception.UnauthorizedException;
import com.ecommerce.backend.repository.RoleRepository;
import com.ecommerce.backend.repository.StoreRepository;
import com.ecommerce.backend.repository.UserRepository;
import com.ecommerce.backend.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final StoreRepository storeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            StoreRepository storeRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.storeRepository = storeRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Transactional
    public UserResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ConflictException("Bu email adresi zaten kayıtlı.");
        }

        Role role = roleRepository.findById(request.roleId())
                .orElseThrow(() -> new BadRequestException("Geçersiz rol id."));

        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(role);
        user = userRepository.save(user);

        if ("store".equalsIgnoreCase(role.getName())) {
            if (request.store() == null) {
                throw new BadRequestException("Mağaza rolü için mağaza bilgisi zorunludur.");
            }

            Store store = new Store();
            store.setName(request.store().name());
            store.setPhone(request.store().phone());
            store.setTaxNo(request.store().taxNo());
            store.setBankAccount(request.store().bankAccount());
            store.setUser(user);
            storeRepository.save(store);
        }

        String token = jwtUtil.generateToken(user.getId(), user.getEmail(), role.getName());

        return toUserResponse(user, token);
    }

    public UserResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UnauthorizedException("Email veya şifre hatalı."));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new UnauthorizedException("Email veya şifre hatalı.");
        }

        String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole().getName());

        return toUserResponse(user, token);
    }

    public UserResponse verify(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UnauthorizedException("Kullanıcı bulunamadı."));

        String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole().getName());

        return toUserResponse(user, token);
    }

    private UserResponse toUserResponse(User user, String token) {
        RoleResponse roleResponse = new RoleResponse(user.getRole().getId(), user.getRole().getName());

        return new UserResponse(user.getId(), user.getName(), user.getEmail(), roleResponse, token);
    }
}