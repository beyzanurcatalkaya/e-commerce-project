package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.request.AddressRequest;
import com.ecommerce.backend.dto.response.AddressResponse;
import com.ecommerce.backend.security.AuthenticatedUser;
import com.ecommerce.backend.service.AddressService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user/address")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping
    public List<AddressResponse> getAddresses(@AuthenticationPrincipal AuthenticatedUser currentUser) {
        return addressService.getAddresses(currentUser.id());
    }

    @PostMapping
    public List<AddressResponse> addAddress(
            @AuthenticationPrincipal AuthenticatedUser currentUser,
            @Valid @RequestBody AddressRequest request
    ) {
        return addressService.addAddress(currentUser.id(), request);
    }

    @PutMapping
    public List<AddressResponse> updateAddress(
            @AuthenticationPrincipal AuthenticatedUser currentUser,
            @Valid @RequestBody AddressRequest request
    ) {
        return addressService.updateAddress(currentUser.id(), request);
    }

    @DeleteMapping("/{id}")
    public List<AddressResponse> deleteAddress(
            @AuthenticationPrincipal AuthenticatedUser currentUser,
            @PathVariable Long id
    ) {
        return addressService.deleteAddress(currentUser.id(), id);
    }
}