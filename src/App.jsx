import React, { useEffect, useState } from "react";

function App() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const [rates, setRates] = useState(null);


  const getUsers = () => {

    setLoading(true);
    setError(false);

    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => {

        if (response.status !== 200) {
          throw new Error("API error");
        }

        return response.json();
      })
      .then(data => {

        setUsers(data);
        setLoading(false);

      })
      .catch(() => {

        setError(true);
        setLoading(false);

      });
  };

  useEffect(() => {
    getUsers();
  }, []);


  const handleSubmit = (e) => {

    e.preventDefault();

    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
      .then(res => res.json())
      .then(() => {

        setMessage("Данные успешно отправлены");

      });
  };


  const getWeather = () => {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`)
      .then(res => res.json())
      .then(data => {

        setWeather(data);

      });
  };


  const getRates = () => {

    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then(res => res.json())
      .then(data => {

        setRates(data.rates);

      });

  };

  useEffect(() => {
    getRates();
  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <h1>API Интеграция</h1>

      {/* ===================== */}
      {/* Пользователи */}
      {/* ===================== */}

      <h2>Список пользователей</h2>

      {loading && <p>Загрузка...</p>}

      {error && <p>Ошибка загрузки данных</p>}

      {users.map(user => (

        <div key={user.id}>
          <p><b>{user.name}</b></p>
          <p>{user.email}</p>
        </div>

      ))}

      <button onClick={getUsers}>Обновить данные</button>

      <hr />

      {/* ===================== */}
      {/* POST форма */}
      {/* ===================== */}

      <h2>Отправка данных</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <button type="submit">Отправить</button>

      </form>

      <p>{message}</p>

      <hr />

      {/* ===================== */}
      {/* Погода */}
      {/* ===================== */}

      <h2>Погода</h2>

      <input
        placeholder="Введите город"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getWeather}>Получить погоду</button>

      {weather && (

        <div>
          <p>Температура: {weather.main?.temp}°C</p>
          <p>Описание: {weather.weather?.[0]?.description}</p>
        </div>

      )}

      <hr />

      {/* ===================== */}
      {/* Курсы валют */}
      {/* ===================== */}

      <h2>Курсы валют</h2>

      {rates && (

        <div>

          <p>USD: {rates.USD}</p>
          <p>EUR: {rates.EUR}</p>
          <p>KZT: {rates.KZT}</p>

        </div>

      )}

      <button onClick={getRates}>Обновить курсы</button>

    </div>
  );
}

export default App;