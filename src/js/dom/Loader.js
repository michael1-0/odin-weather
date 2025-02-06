export default class Loader {
  constructor() {
    this.loaderContainer = document.createElement("div");
    this.loaderContainer.id = "loader-container";
    this.loaderContainer.innerHTML = `
      <style>
        #loader-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.51);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        #loader {
          width: 50px;
          height: 50px;
          border: 5px solid #f3f3f3;
          border-top: 5px solid rgb(67, 68, 68);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <div id="loader"></div>
    `;
  }

  showLoader() {
    document.querySelector("main").appendChild(this.loaderContainer);
  }

  hideLoader() {
    const loader = document.getElementById("loader-container");
    if (loader) {
      loader.remove();
    }
  }
}
