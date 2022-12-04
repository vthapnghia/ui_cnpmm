const isLoading = () => {
  const element = document.getElementById("spinner");
  element.style.display = "flex";
};

const hideLoading = () => {
  const element = document.getElementById("spinner");
  element.style.display = "none";
};

export {isLoading, hideLoading}
