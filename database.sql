CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(200),
    firstName VARCHAR(200),
    lastName VARCHAR(200),
    email VARCHAR(200),
    role VARCHAR(200),
    password VARCHAR(200),
    borrowed INT []
);
CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    author VARCHAR(200),
    published_year VARCHAR(200),
    genre VARCHAR(200),
    image VARCHAR(200),
    stock INTEGER,
    borrowed_by INT []
);
INSERT INTO users (
        username,
        firstName,
        lastName,
        email,
        role,
        password,
        borrowed
    )
VALUES (
        'admin',
        'Gabriel',
        'Hughes',
        'Gabriel@Hughes.com',
        'Librarian',
        'admin',
        ARRAY []::integer []
    ),
    (
        'JonasH',
        'Jonas',
        'Hellborg',
        'Jonas@gmail.com',
        'Student',
        'JonasH',
        ARRAY []::integer []
    ),
    (
        'LucyH',
        'Lucy',
        'Highton',
        'Lucy@gmail.com',
        'Librarian',
        'LucyH',
        ARRAY []::integer []
    ),
    (
        'RaulM',
        'Raul',
        'Molina',
        'Raul@yahoo.com',
        'Student',
        'RaulM',
        ARRAY []::integer []
    ),
    (
        'SophieO',
        'Sophie',
        'Ollek',
        'Sophie@gmail.com',
        'Student',
        'SophieO',
        ARRAY []::integer []
    ),
    (
        'LunaT',
        'Luna',
        'Thordall',
        'Luna@gmail.com',
        'Student',
        'LunaT',
        ARRAY []::integer []
    ),
    (
        'FranciscoJ',
        'Francisco',
        'Juarez',
        'Francisco@gmail.com',
        'Student',
        'FranciscoJ',
        ARRAY []::integer []
    ),
    (
        'ThadeusM',
        'Thadeus',
        'Meller',
        'Thadeus@gmail.com',
        'Student',
        'ThadeusM',
        ARRAY []::integer []
    ),
    (
        'BryanK',
        'Bryan',
        'McMahon',
        'Bryan@gmail.com',
        'Student',
        'BryanK',
        ARRAY []::integer []
    ),
    (
        'JacintoL',
        'Jacinto',
        'Linares',
        'Jacinto@gmail.com',
        'Student',
        'JacintoL',
        ARRAY []::integer []
    );
INSERT INTO books (
        title,
        author,
        published_year,
        genre,
        image,
        stock,
        borrowed_by
    )
VALUES (
        'Jicaras Tristes',
        'Alfredo Espino',
        '1936',
        'Poetry',
        'https://images-na.ssl-images-amazon.com/images/I/81IrPh5LJmL.jpg',
        10,
        ARRAY []::integer []
    ),
    (
        'To the Lighthouse',
        'Virginia Woolf',
        '1943',
        'Fiction',
        'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1333994546l/18517.jpg',
        15,
        ARRAY []::integer []
    ),
    (
        'The Unbearable Lightness of Being',
        'Milan Kundera',
        '1969',
        'Fiction',
        'https://images-na.ssl-images-amazon.com/images/I/71HpBJgSeYL.jpg',
        7,
        ARRAY []::integer []
    ),
    (
        'Solaris',
        'Stanislaw Lem',
        '1981',
        'Science Fiction',
        'https://images-na.ssl-images-amazon.com/images/I/51yQl6pPpeL.jpg',
        3,
        ARRAY []::integer []
    ),
    (
        'Tractatus Logico-Philosophicus',
        'Ludwig Wittgenstein ',
        '1921',
        'Philosophy',
        'https://kbimages1-a.akamaihd.net/719b2985-0599-41ac-b03c-d3cb6769cde1/1200/1200/False/tractatus-logico-philosophicus-29.jpg',
        9,
        ARRAY []::integer []
    ),
    (
        'Trilce',
        'Cesar Vallejo',
        '1930',
        'Poetry',
        'https://images-na.ssl-images-amazon.com/images/I/51rh4cBX2dL._SX312_BO1,204,203,200_.jpg',
        12,
        ARRAY []::integer []
    ),
    (
        'Wuthering Heights',
        'Emily Brontë',
        '1847',
        'Tragedy',
        'https://images-na.ssl-images-amazon.com/images/I/71ogwlE3YNL.jpg',
        5,
        ARRAY []::integer []
    ),
    (
        'In Search of Lost Time ',
        'Marcel Proust',
        '1913',
        'Modernist',
        'https://m.media-amazon.com/images/I/41vnN9Cc5EL.jpg',
        2,
        ARRAY []::integer []
    ),
    (
        'The Futurological Congress',
        'Stanislaw Lem',
        '1971',
        'Science Fiction',
        'https://m.media-amazon.com/images/I/51GWCPbcEwL.jpg',
        6,
        ARRAY []::integer []
    ),
    (
        'Moby Dick',
        'Herman Melville',
        '1851',
        'Adventure',
        'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/8532/9781853260087.jpg',
        12,
        ARRAY []::integer []
    );