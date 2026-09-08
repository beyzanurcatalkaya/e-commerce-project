package com.ecommerce.backend.dto.request;

import jakarta.validation.constraints.NotBlank;

public record StoreRequest(
        @NotBlank String name,
        String phone,
        String taxNo,
        String bankAccount
) {
}