package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.request.CreditCardRequest;
import com.ecommerce.backend.dto.response.CreditCardResponse;
import com.ecommerce.backend.security.AuthenticatedUser;
import com.ecommerce.backend.service.CreditCardService;
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
@RequestMapping("/user/card")
public class CreditCardController {

    private final CreditCardService creditCardService;

    public CreditCardController(CreditCardService creditCardService) {
        this.creditCardService = creditCardService;
    }

    @GetMapping
    public List<CreditCardResponse> getCards(@AuthenticationPrincipal AuthenticatedUser currentUser) {
        return creditCardService.getCards(currentUser.id());
    }

    @PostMapping
    public List<CreditCardResponse> addCard(
            @AuthenticationPrincipal AuthenticatedUser currentUser,
            @Valid @RequestBody CreditCardRequest request
    ) {
        return creditCardService.addCard(currentUser.id(), request);
    }

    @PutMapping
    public List<CreditCardResponse> updateCard(
            @AuthenticationPrincipal AuthenticatedUser currentUser,
            @Valid @RequestBody CreditCardRequest request
    ) {
        return creditCardService.updateCard(currentUser.id(), request);
    }

    @DeleteMapping("/{id}")
    public List<CreditCardResponse> deleteCard(
            @AuthenticationPrincipal AuthenticatedUser currentUser,
            @PathVariable Long id
    ) {
        return creditCardService.deleteCard(currentUser.id(), id);
    }
}