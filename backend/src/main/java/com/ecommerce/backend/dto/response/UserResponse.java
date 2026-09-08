package com.ecommerce.backend.dto.response;

public record UserResponse(
        Long id,
        String name,
        String email,
        RoleResponse role,
        String token
) {
}