package com.ecommerce.backend.config;

import com.ecommerce.backend.entity.Category;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.entity.ProductImage;
import com.ecommerce.backend.entity.Role;
import com.ecommerce.backend.entity.Store;
import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.repository.CategoryRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.RoleRepository;
import com.ecommerce.backend.repository.StoreRepository;
import com.ecommerce.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final StoreRepository storeRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(
            RoleRepository roleRepository,
            CategoryRepository categoryRepository,
            UserRepository userRepository,
            StoreRepository storeRepository,
            ProductRepository productRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.roleRepository = roleRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.storeRepository = storeRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (roleRepository.count() == 0) {
            seedRole(1L, "customer");
            seedRole(2L, "store");
            seedRole(3L, "admin");
        }

        List<Category> categories = new ArrayList<>();

        if (categoryRepository.count() == 0) {
            categories.add(seedCategory("Kadın Giyim", "kadin"));
            categories.add(seedCategory("Kadın Ayakkabı", "kadin"));
            categories.add(seedCategory("Erkek Giyim", "erkek"));
            categories.add(seedCategory("Erkek Ayakkabı", "erkek"));
            categories.add(seedCategory("Aksesuar", "genel"));
        } else {
            categories.addAll(categoryRepository.findAll());
        }

        if (userRepository.count() == 0) {
            Role customerRole = roleRepository.findById(1L).orElseThrow();
            Role storeRole = roleRepository.findById(2L).orElseThrow();
            Role adminRole = roleRepository.findById(3L).orElseThrow();

            seedUser("Demo Customer", "customer@commerce.com", customerRole);
            User storeOwner = seedUser("Demo Store Owner", "store@commerce.com", storeRole);
            seedUser("Demo Admin", "admin@commerce.com", adminRole);

            Store store = new Store();
            store.setName("Demo Mağaza");
            store.setPhone("05551234567");
            store.setTaxNo("T1234V123456");
            store.setBankAccount("TR120006200119000006672315");
            store.setUser(storeOwner);
            store = storeRepository.save(store);

            seedProducts(categories, store);
        }
    }

    private void seedRole(Long id, String name) {
        Role role = new Role();
        role.setId(id);
        role.setName(name);
        roleRepository.save(role);
    }

    private Category seedCategory(String title, String gender) {
        Category category = new Category();
        category.setTitle(title);
        category.setGender(gender);
        return categoryRepository.save(category);
    }

    private User seedUser(String name, String email, Role role) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode("123456"));
        user.setRole(role);
        return userRepository.save(user);
    }

    private void seedProducts(List<Category> categories, Store store) {
        String[] productNames = {
                "Basic Tişört", "Slim Fit Pantolon", "Kareli Gömlek", "Deri Ceket",
                "Spor Ayakkabı", "Klasik Topuklu", "Bot", "Sneaker",
                "Kot Ceket", "Triko Kazak", "Deri Kemer", "Güneş Gözlüğü"
        };

        for (int i = 0; i < productNames.length; i++) {
            Category category = categories.get(i % categories.size());

            Product product = new Product();
            product.setName(productNames[i]);
            product.setDescription(productNames[i] + " - kaliteli kumaş, günlük kullanım için uygun.");
            product.setPrice(BigDecimal.valueOf(150 + (i * 37) % 500));
            product.setStock(20 + i);
            product.setRating(3.5 + (i % 5) * 0.3);
            product.setSellCount(i * 4);
            product.setCategory(category);
            product.setStore(store);

            ProductImage image = new ProductImage();
            image.setUrl("https://picsum.photos/seed/product" + i + "/600/800");
            image.setIndex(0);
            image.setProduct(product);
            product.getImages().add(image);

            productRepository.save(product);
        }
    }
}