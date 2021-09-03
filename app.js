// declare all id tag -------------====>
const showResults = document.getElementById("show-results");
const ShowGetData = document.getElementById("ShowGetData");
const ShowGetImages = document.getElementById("ShowGetImages");
const inputData = document.getElementById("inputData");
const clickBtn = document.getElementById("clickBtn");
const ShowErrorData = document.getElementById("ShowErrorData");

// Onclick Seach event function ----------------=>

const getOpenLibBookData = async () => {
    try
    {
        if (inputData.value === "")
        {
            ShowErrorData.innerText = "Please Fill The InputBox"
            ShowGetData.innerHTML = "";
            showResults.innerText = 0;
        } else
        {
            const fetchBookApi = await 
            fetch("https://openlibrary.org/search.json?q=${inputData.value}");

            const getBookApi = await fetchBookApi.json();
            if (getBookApi.docs.length > 0)
            {
                getBookData(getBookApi.docs.slice(0,34));
                showResults.innerText = getBookApi.docs.length;
            }
            else
            {
                ShowErrorData.innerText = "Opps! No Data Found"
                ShowGetData.innerHTML = "";
                showResults.innerText = 0;
            }
            inputData.value = "";
        }
    } catch (error)
    {
        console.log(error);
    }
};

// show all data events function ---------------------=>

const getBookData = (BookData) => {
    ShowGetData.innerHTML = "";
    ShowErrorData.innerText = "";
    // use forEach function -----------------=>
    BookData.forEach((crrElm) => {
        const { cover_i, first_publish_year, publisher, title, author_name } = crrElm;
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div class="card bg-dark text-light">
                <img id="ShowGetImages" src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" class="card-images" alt="BookImg Not Found">
            <div class="card-body">
                <h5 class="card-title">Book Name : ${title ? title : "title not found"}</h5>
                <p class="card-text">Author Name : ${author_name ? author_name[0] : "Author Name Not Found"}</p>
                <p class="card-text">Publisher : ${publisher ? publisher[0] : "Publisher Not Found"}</p>
                <p class="card-text">first publish year : ${first_publish_year ? first_publish_year : "first publish year not found"}</p>
            </div>
        </div>
        `;
        ShowGetData.appendChild(div);
    })
}

// onclick event declare --------------=>
clickBtn.addEventListener("click", getOpenLibBookData);