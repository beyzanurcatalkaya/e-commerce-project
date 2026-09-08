package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.request.CreditCardRequest;
import com.ecommerce.backend.dto.response.CreditCardResponse;
import com.ecommerce.backend.entity.CreditCard;
import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.exception.NotFoundException;
import com.ecommerce.backend.repository.CreditCardRepository;
import com.ecommerce.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CreditCardService {

    private final CreditCardRepository creditCardRepository;
    private final UserRepository userRepository;

    public CreditCardService(CreditCardRepository creditCardRepository, UserRepository userRepository) {
        this.creditCardRepository = creditCardRepository;
        this.userRepository = userRepository;
    }

    public List<CreditCardResponse> getCards(Long userId) {
        return creditCardRepository.findByUserId(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    public List<CreditCardResponse> addCard(Long userId, CreditCardRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Kullanıcı bulunamadı."));

        CreditCard card = new CreditCard();
        applyRequest(card, request);
        card.setUser(user);
        creditCardRepository.save(card);

        return getCards(userId);
    }

    public List<CreditCardResponse> updateCard(Long userId, CreditCardRequest request) {
        CreditCard card = creditCardRepository.findById(request.id())
                .orElseThrow(() -> new NotFoundException("Kart bulunamadı."));

        if (!card.getUser().getId().equals(userId)) {
            throw new NotFoundException("Kart bulunamadı.");
        }

        applyRequest(card, request);
        creditCardRepository.save(card);

        return getCards(userId);
    }

    public List<CreditCardResponse> deleteCard(Long userId, Long cardId) {
        CreditCard card = creditCardRepository.findById(cardId)
                .orElseThrow(() -> new NotFoundException("Kart bulunamadı."));

        if (!card.getUser().getId().equals(userId)) {
            throw new NotFoundException("Kart bulunamadı.");
        }

        creditCardRepository.delete(card);

        return getCards(userId);
    }

    private void applyRequest(CreditCard card, CreditCardRequest request) {
        card.setCardNo(request.cardNo());
        card.setExpireMonth(request.expireMonth());
        card.setExpireYear(request.expireYear());
        card.setNameOnCard(request.nameOnCard());
    }

    private CreditCardResponse toResponse(CreditCard card) {
        return new CreditCardResponse(
                card.getId(),
                card.getCardNo(),
                card.getExpireMonth(),
                card.getExpireYear(),
                card.getNameOnCard()
        );
    }
}