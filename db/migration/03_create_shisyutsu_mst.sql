CREATE TABLE shisyutsu_mst (
    shisyutsu_id SERIAL PRIMARY KEY,
    shisyutsu_date DATE NOT NULL,
    user_id INT NOT NULL,
    item_id INT NOT NULL,
    shisyutsu_name VARCHAR(100) NOT NULL,
    shisyutsu_amount INT NOT NULL,
    shisyutsu_added_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_mst(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_item_id FOREIGN KEY (item_id) REFERENCES item_mst(item_id) ON DELETE CASCADE
);