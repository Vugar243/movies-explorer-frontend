/*
const dummyMovies = [
  { 
    id: 1, 
    title: 'Фильм 1', 
    description: 'Описание фильма 1', 
    poster: 'https://gas-kvas.com/uploads/posts/2023-02/1675495569_gas-kvas-com-p-luchshie-kartinki-dlya-fonovogo-risunka-ra-31.jpg', 
    duration: 120, // Продолжительность в минутах
    liked: false,  // Признак, что фильм лайкнут
    disliked: false  // Признак, что фильм дизлайкнут
  },
  { 
    id: 2, 
    title: 'Фильм 2', 
    description: 'Описание фильма 2', 
    poster: 'https://gas-kvas.com/uploads/posts/2023-02/1675495569_gas-kvas-com-p-luchshie-kartinki-dlya-fonovogo-risunka-ra-31.jpg', 
    duration: 90, // Продолжительность в минутах
    liked: false,  // Признак, что фильм лайкнут
    disliked: false  // Признак, что фильм дизлайкнут
  },
  { 
    id: 1, 
    title: 'Фильм 1', 
    description: 'Описание фильма 1', 
    poster: 'https://gas-kvas.com/uploads/posts/2023-02/1675495569_gas-kvas-com-p-luchshie-kartinki-dlya-fonovogo-risunka-ra-31.jpg', 
    duration: 120, // Продолжительность в минутах
    liked: false,  // Признак, что фильм лайкнут
    disliked: false  // Признак, что фильм дизлайкнут
  },
  { 
    id: 1, 
    title: 'Фильм 1', 
    description: 'Описание фильма 1', 
    poster: 'https://gas-kvas.com/uploads/posts/2023-02/1675495569_gas-kvas-com-p-luchshie-kartinki-dlya-fonovogo-risunka-ra-31.jpg', 
    duration: 120, // Продолжительность в минутах
    liked: false,  // Признак, что фильм лайкнут
    disliked: false  // Признак, что фильм дизлайкнут
  },
  { 
    id: 1, 
    title: 'Фильм 1', 
    description: 'Описание фильма 1', 
    poster: 'https://gas-kvas.com/uploads/posts/2023-02/1675495569_gas-kvas-com-p-luchshie-kartinki-dlya-fonovogo-risunka-ra-31.jpg', 
    duration: 120, // Продолжительность в минутах
    liked: false,  // Признак, что фильм лайкнут
    disliked: false  // Признак, что фильм дизлайкнут
  },
  { 
    id: 1, 
    title: 'Фильм 1', 
    description: 'Описание фильма 1', 
    poster: 'https://gas-kvas.com/uploads/posts/2023-02/1675495569_gas-kvas-com-p-luchshie-kartinki-dlya-fonovogo-risunka-ra-31.jpg', 
    duration: 120, // Продолжительность в минутах
    liked: false,  // Признак, что фильм лайкнут
    disliked: false  // Признак, что фильм дизлайкнут
  },
  { 
    id: 1, 
    title: 'Фильм 1', 
    description: 'Описание фильма 1', 
    poster: 'https://gas-kvas.com/uploads/posts/2023-02/1675495569_gas-kvas-com-p-luchshie-kartinki-dlya-fonovogo-risunka-ra-31.jpg', 
    duration: 120, // Продолжительность в минутах
    liked: false,  // Признак, что фильм лайкнут
    disliked: false  // Признак, что фильм дизлайкнут
  },
  { 
    id: 1, 
    title: 'Фильм 1', 
    description: 'Описание фильма 1', 
    poster: 'https://gas-kvas.com/uploads/posts/2023-02/1675495569_gas-kvas-com-p-luchshie-kartinki-dlya-fonovogo-risunka-ra-31.jpg', 
    duration: 120, // Продолжительность в минутах
    liked: false,  // Признак, что фильм лайкнут
    disliked: false  // Признак, что фильм дизлайкнут
  },
  { 
    id: 1, 
    title: 'Фильм 1', 
    description: 'Описание фильма 1', 
    poster: 'https://gas-kvas.com/uploads/posts/2023-02/1675495569_gas-kvas-com-p-luchshie-kartinki-dlya-fonovogo-risunka-ra-31.jpg', 
    duration: 120, // Продолжительность в минутах
    liked: false,  // Признак, что фильм лайкнут
    disliked: false  // Признак, что фильм дизлайкнут
  },
  { 
    id: 1, 
    title: 'Фильм 1', 
    description: 'Описание фильма 1', 
    poster: 'https://gas-kvas.com/uploads/posts/2023-02/1675495569_gas-kvas-com-p-luchshie-kartinki-dlya-fonovogo-risunka-ra-31.jpg', 
    duration: 120, // Продолжительность в минутах
    liked: false,  // Признак, что фильм лайкнут
    disliked: false  // Признак, что фильм дизлайкнут
  },
  { 
    id: 1, 
    title: 'Фильм 1', 
    description: 'Описание фильма 1', 
    poster: 'https://gas-kvas.com/uploads/posts/2023-02/1675495569_gas-kvas-com-p-luchshie-kartinki-dlya-fonovogo-risunka-ra-31.jpg', 
    duration: 120, // Продолжительность в минутах
    liked: false,  // Признак, что фильм лайкнут
    disliked: false  // Признак, что фильм дизлайкнут
  },
  { 
    id: 1, 
    title: 'Фильм 1', 
    description: 'Описание фильма 1', 
    poster: 'https://gas-kvas.com/uploads/posts/2023-02/1675495569_gas-kvas-com-p-luchshie-kartinki-dlya-fonovogo-risunka-ra-31.jpg', 
    duration: 120, // Продолжительность в минутах
    liked: false,  // Признак, что фильм лайкнут
    disliked: false  // Признак, что фильм дизлайкнут
  },
  { 
    id: 1, 
    title: 'Фильм 1', 
    description: 'Описание фильма 1', 
    poster: 'https://gas-kvas.com/uploads/posts/2023-02/1675495569_gas-kvas-com-p-luchshie-kartinki-dlya-fonovogo-risunka-ra-31.jpg', 
    duration: 120, // Продолжительность в минутах
    liked: false,  // Признак, что фильм лайкнут
    disliked: false  // Признак, что фильм дизлайкнут
  },
  { 
    id: 1, 
    title: 'Фильм 1', 
    description: 'Описание фильма 1', 
    poster: 'https://gas-kvas.com/uploads/posts/2023-02/1675495569_gas-kvas-com-p-luchshie-kartinki-dlya-fonovogo-risunka-ra-31.jpg', 
    duration: 120, // Продолжительность в минутах
    liked: false,  // Признак, что фильм лайкнут
    disliked: false  // Признак, что фильм дизлайкнут
  },
  { 
    id: 1, 
    title: 'Фильм 1', 
    description: 'Описание фильма 1', 
    poster: 'https://gas-kvas.com/uploads/posts/2023-02/1675495569_gas-kvas-com-p-luchshie-kartinki-dlya-fonovogo-risunka-ra-31.jpg', 
    duration: 120, // Продолжительность в минутах
    liked: false,  // Признак, что фильм лайкнут
    disliked: false  // Признак, что фильм дизлайкнут
  },
  { 
    id: 1, 
    title: 'Фильм 1', 
    description: 'Описание фильма 1', 
    poster: 'https://gas-kvas.com/uploads/posts/2023-02/1675495569_gas-kvas-com-p-luchshie-kartinki-dlya-fonovogo-risunka-ra-31.jpg', 
    duration: 120, // Продолжительность в минутах
    liked: false,  // Признак, что фильм лайкнут
    disliked: false  // Признак, что фильм дизлайкнут
  },
];
*/
const dummyMovies = [
  { 
    id: 1, 
    title: 'Фильм 1', 
    description: 'Описание фильма 1', 
    poster: 'https://gas-kvas.com/uploads/posts/2023-02/1675495569_gas-kvas-com-p-luchshie-kartinki-dlya-fonovogo-risunka-ra-31.jpg', 
    duration: 120, // Продолжительность в минутах
    liked: false,  // Признак, что фильм лайкнут
    disliked: false  // Признак, что фильм дизлайкнут
  },
  { 
    id: 2, 
    title: 'Фильм 2', 
    description: 'Описание фильма 2', 
    poster: 'https://gas-kvas.com/uploads/posts/2023-02/1675495569_gas-kvas-com-p-luchshie-kartinki-dlya-fonovogo-risunka-ra-31.jpg', 
    duration: 90, // Продолжительность в минутах
    liked: false,  // Признак, что фильм лайкнут
    disliked: false  // Признак, что фильм дизлайкнут
  },

  

];

export default dummyMovies;
