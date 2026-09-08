package com.ecommerce.backend.dto.response;

import java.util.List;

public record ProductListResponse(
        Long total,
        List<ProductResponse> products
) {
}