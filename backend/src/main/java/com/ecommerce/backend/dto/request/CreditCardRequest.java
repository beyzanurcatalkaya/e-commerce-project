package com.ecommerce.backend.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreditCardRequest(
        Long id,
        @NotBlank String cardNo,
        @NotNull @Min(1) @Max(12) Integer expireMonth,
        @NotNull Integer expireYear,
        @NotBlank String nameOnCard
) {
}