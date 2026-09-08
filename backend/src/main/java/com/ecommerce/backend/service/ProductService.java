package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.response.ProductImageResponse;
import com.ecommerce.backend.dto.response.ProductListResponse;
import com.ecommerce.backend.dto.response.ProductResponse;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.exception.NotFoundException;
import com.ecommerce.backend.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductListResponse getProducts(Long categoryId, String filter, String sort, int limit, int offset) {
        Specification<Product> spec = null;

        if (categoryId != null) {
            spec = ProductSpecifications.hasCategory(categoryId);
        }

        if (filter != null && !filter.isBlank()) {
            Specification<Product> filterSpec = ProductSpecifications.nameOrDescriptionContains(filter);
            spec = (spec == null) ? filterSpec : spec.and(filterSpec);
        }

        int page = limit > 0 ? offset / limit : 0;
        PageRequest pageRequest = PageRequest.of(page, limit, parseSort(sort));

        Page<Product> result = productRepository.findAll(spec, pageRequest);

        List<ProductResponse> products = result.getContent().stream()
                .map(this::toProductResponse)
                .toList();

        return new ProductListResponse(result.getTotalElements(), products);
    }

    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Ürün bulunamadı."));

        return toProductResponse(product);
    }

    private Sort parseSort(String sort) {
        if (sort == null || sort.isBlank()) {
            return Sort.by("id").ascending();
        }

        String[] parts = sort.split(":");
        String field = parts[0];
        boolean descending = parts.length > 1 && "desc".equalsIgnoreCase(parts[1]);

        return descending ? Sort.by(field).descending() : Sort.by(field).ascending();
    }

    private ProductResponse toProductResponse(Product product) {
        List<ProductImageResponse> images = product.getImages().stream()
                .sorted(Comparator.comparing(image -> image.getIndex() == null ? 0 : image.getIndex()))
                .map(image -> new ProductImageResponse(image.getId(), image.getUrl(), image.getIndex()))
                .toList();

        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getRating(),
                product.getSellCount(),
                product.getCategory().getId(),
                product.getStore().getId(),
                images
        );
    }
}