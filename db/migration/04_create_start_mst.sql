CREATE TABLE start_mst (
    start_id SERIAL PRIMARY KEY,
    start_year_month INT NOT NULL,
    user_id INT NOT NULL,
    start_amount INT NOT NULL,
    start_added_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_mst(user_id) ON DELETE CASCADE
);