package com.ecommerce.backend.dto.response;

import java.math.BigDecimal;
import java.util.List;

public record ProductResponse(
        Long id,
        String name,
        String description,
        BigDecimal price,
        Integer stock,
        Double rating,
        Integer sellCount,
        Long categoryId,
        Long storeId,
        List<ProductImageResponse> images
) {
}