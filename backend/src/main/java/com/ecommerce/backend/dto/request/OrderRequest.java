package com.ecommerce.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.util.List;

public record OrderRequest(
        @NotNull Long addressId,
        @NotBlank String cardNo,
        @NotBlank String cardName,
        @NotNull Integer cardExpireMonth,
        @NotNull Integer cardExpireYear,
        @NotNull Integer cardCcv,
        @NotNull @Positive BigDecimal price,
        @NotEmpty List<OrderItemRequest> products
) {
}