const baseurl = "https://www.themealdb.com/api/json/v1/1";

fetch(`${baseurl}/search.php?s=Arrabiata`)
    .then(res => {
        if (res.ok) {
            return res.json(); // Parse response JSON
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
        console.log("SUCCESS");
        console.log(data); // Log the response data
    })
    .catch(error => console.error('Error:', error));
