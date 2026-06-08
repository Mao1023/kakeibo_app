CREATE TABLE item_mst (
    item_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    item_name VARCHAR(50) NOT NULL,
    item_type INT NOT NULL,
    item_kotei_amount INT,
    item_added_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_mst(user_id) ON DELETE CASCADE
);