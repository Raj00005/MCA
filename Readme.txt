<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Netflix Clone</title>
    <style>
        body {
            margin: 0;
            font-family: 'Arial', sans-serif;
        }

        .header {
            background-color: #111;
            padding: 10px;
        }

        .logo {
            width: 100px;
        }

        .main {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding: 20px;
        }

        .movie {
            margin: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
        }

        .movie:hover {
            transform: scale(1.05);
        }

        .movie-poster {
            width: 100%;
            height: auto;
        }

        .movie-info {
            padding: 10px;
        }

        .movie-title {
            margin: 0;
            font-size: 16px;
        }

        .watch-button {
            background-color: #e50914;
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
            font-weight: bold;
            border-radius: 4px;
        }

        .footer {
            background-color: #111;
            color: white;
            text-align: center;
            padding: 10px;
            position: fixed;
            bottom: 0;
            width: 100%;
        }
    </style>
</head>
<body>
    <header class="header">
        <img src="netflix-logo.png" alt="Netflix Logo" class="logo">
    </header>

    <div class="main">
        <div class="movie">
            <img src="movie1.jpg" alt="Movie 1" class="movie-poster">
            <div class="movie-info">
                <h3 class="movie-title">Movie 1</h3>
                <button class="watch-button">Watch Now</button>
            </div>
        </div>

        <!-- Add more movie divs as needed -->

    </div>

    <footer class="footer">
        <p>&copy; 2024 Netflix Clone</p>
    </footer>

    <script>
        // You can add JavaScript functionalities here if needed
    </script>
</body>
</html>
