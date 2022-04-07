<?php
    $mysql = mysqli_connect("localhost", "root", "", "test");
    if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  exit();
    }

    if (isset($_GET['marka'])) {
        $res = mysqli_query($mysql, "INSERT INTO marki (marka) VALUES ('". $_POST['marka'] . "')");
        echo("<script>alert(\"Dodano do bazy!\"); window.location.href = \"/samochody.php\"</script>");
    }
    $q = mysqli_query($mysql, "SELECT m.marka AS marka, a.model AS model, a.cena AS cena, a.kolor AS kolor, p.kraj as kraj FROM `auto` a INNER JOIN `marki` m ON a.id_m = m.id INNER JOIN `pochodzenie` p ON a.id_k = p.id");
    $avg = mysqli_query($mysql, "SELECT AVG(cena) as avarage FROM `auto`");
    $avgnumber = mysqli_fetch_row($avg)[0];
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="skrypt.js" defer></script>
    <title>Samochody –– kupno/sprzedaż</title>
</head>

<body>
    <div class="header">
        <h1>Samochody –– kupno/sprzedaż</h1>
    </div>
    <div class="content">
        <div class="left">
        <p>Miesiąc: <span class="month"></span></p>
        <!-- skrypt 1 -->
        <script>
            const date = new Date();  // 2009-11-10

            document.getElementsByClassName("month")[0].textContent = date.toLocaleString('default', { month: 'long' });
        </script>
        <p>Dodaj nową markę do tabeli marki</p>
        <form name="dodaj" onsubmit="return validate()" method="get">
            <label for="marka">Marka: </label>
            <input type="text" name="marka" class="marka"><br>
            <button type="submit">Wyślij</button>
        </form>
        <p>Ostatnia modyfikcja strony: <span id="ostatnia_modyfikacja"></span></p>
        <!-- skrypt 2 -->
    </div>
    <div class="middle">
    <h2>Samochody koloru czarnego</h2>
    <!-- skrypt 3 -->
    <table cellpadding="0" cellspacing="0">
        <?php
        while ($row = mysqli_fetch_assoc($q)) {
        ?>
        <tr>
            <td><?php echo($row['marka'])?></td>
            <td><?php echo($row['model'])?></td>
            <td><?php echo($row['cena'])?></td>
            <td><?php echo($row['kolor'])?></td>
            <td><?php echo($row['kraj'])?></td>
        </tr>
        <?php
        }
        ?>
    </table>
    <p>Średnia cena samochodów koloru czarnego to: <?php echo($avgnumber)?></p>
    <img src="./car.jpg" alt="Samochód" class="car">
    </div>
    <div class="right">
    <a href="https://gratka.pl/motoryzacja">Przejdź do strony GRATKA MOTORYZACJA (kliknij tutaj lub na logo)</a>
    <img class="gratka" src="./gratka.png" alt="Gratka" onclick="window.location='https://gratka.pl/motoryzacja'">
    </div>
    </div>
    <div class="footer">
        <h3>Pracę wykonał <span class="autor">Wojciech Koperski</span></h3>
    </div>
</body>

</html>