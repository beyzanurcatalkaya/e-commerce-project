package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.response.RoleResponse;
import com.ecommerce.backend.repository.RoleRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RoleController {

    private final RoleRepository roleRepository;

    public RoleController(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @GetMapping("/roles")
    public List<RoleResponse> getAllRoles() {
        return roleRepository.findAll().stream()
                .map(role -> new RoleResponse(role.getId(), role.getName()))
                .toList();
    }
}