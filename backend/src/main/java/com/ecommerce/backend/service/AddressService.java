package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.request.AddressRequest;
import com.ecommerce.backend.dto.response.AddressResponse;
import com.ecommerce.backend.entity.Address;
import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.exception.NotFoundException;
import com.ecommerce.backend.repository.AddressRepository;
import com.ecommerce.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public AddressService(AddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    public List<AddressResponse> getAddresses(Long userId) {
        return addressRepository.findByUserId(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    public List<AddressResponse> addAddress(Long userId, AddressRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Kullanıcı bulunamadı."));

        Address address = new Address();
        applyRequest(address, request);
        address.setUser(user);
        addressRepository.save(address);

        return getAddresses(userId);
    }

    public List<AddressResponse> updateAddress(Long userId, AddressRequest request) {
        Address address = addressRepository.findById(request.id())
                .orElseThrow(() -> new NotFoundException("Adres bulunamadı."));

        if (!address.getUser().getId().equals(userId)) {
            throw new NotFoundException("Adres bulunamadı.");
        }

        applyRequest(address, request);
        addressRepository.save(address);

        return getAddresses(userId);
    }

    public List<AddressResponse> deleteAddress(Long userId, Long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new NotFoundException("Adres bulunamadı."));

        if (!address.getUser().getId().equals(userId)) {
            throw new NotFoundException("Adres bulunamadı.");
        }

        addressRepository.delete(address);

        return getAddresses(userId);
    }

    private void applyRequest(Address address, AddressRequest request) {
        address.setTitle(request.title());
        address.setName(request.name());
        address.setSurname(request.surname());
        address.setPhone(request.phone());
        address.setCity(request.city());
        address.setDistrict(request.district());
        address.setNeighborhood(request.neighborhood());
    }

    private AddressResponse toResponse(Address address) {
        return new AddressResponse(
                address.getId(),
                address.getTitle(),
                address.getName(),
                address.getSurname(),
                address.getPhone(),
                address.getCity(),
                address.getDistrict(),
                address.getNeighborhood()
        );
    }
}