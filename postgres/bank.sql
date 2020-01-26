CREATE TABLE bank (
    id SERIAL PRIMARY KEY,
    type VARCHAR(1000) NOT NULL,
    title VARCHAR(1000) NOT NULL,
    position INTEGER NOT NULL,
    img VARCHAR(1000) NOT NULL
);

INSERT INTO bank (type, title, position, img) VALUES 
    ('bank-draft', 'Bank Draft', 0, 'https://media.giphy.com/media/38bFvh7mpryOA/giphy.gif'),
    ('bill-of-lading', 'Bill of Lading', 1, 'https://media1.giphy.com/media/581Zvttgt7Witjgc0Y/giphy.gif?cid=790b7611ccdfeb12d039d5c4c74cb8796c9bfa3f1b29315c&rid=giphy.gif'),
    ('invoice', 'Invoice', 2, 'https://media.giphy.com/media/MCfhrrNN1goH6/giphy.gif'),
    ('bank-draft-2', 'Bank Draft 2', 3, 'https://media.giphy.com/media/xThuWpnG8UOeTmFVmg/giphy.gif'),
    ('bill-of-lading-2', 'Bill of Lading 2', 4, 'https://media.giphy.com/media/9GIFGeuuinRxgEj7Zq/giphy.gif');
    
