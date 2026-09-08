package com.ecommerce.backend.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderResponse(
        Long id,
        Long addressId,
        LocalDateTime orderDate,
        String cardName,
        BigDecimal price,
        List<OrderItemResponse> products
) {
}