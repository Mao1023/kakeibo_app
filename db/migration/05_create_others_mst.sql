CREATE TABLE others_mst (
    others_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    others_start_day INT NOT NULL,
    others_monthly_budget INT NOT NULL,
    others_carry_over BOOLEAN NOT NULL,
    others_added_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_mst(user_id) ON DELETE CASCADE
);