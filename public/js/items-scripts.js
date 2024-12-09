document.addEventListener("DOMContentLoaded", function () {
  const modalOverlay = document.getElementById("modal-overlay");
  const addItemButton = document.getElementById("addItemButton");
  const saveButton = document.getElementById("saveButton");
  const editButtons = document.querySelectorAll(".editButton");
  const deleteButtons = document.querySelectorAll(".deleteButton");
  const closeModalButtons = document.querySelectorAll(".closeModalButton");
  const imageFileInput = document.querySelector('input[type="file"]');
  const priceInput = document.getElementById("itemPrice");
  const sortOrderButton = document.querySelector('label[for="sortOrder"]');
  const sortOrderToggle = document.getElementById("sortOrder");
  let modalMode = modalOverlay.dataset.modalMode;

  function updateSortOrderState() {
    if (sortOrderToggle.checked) {
      sortOrderButton.classList.add("bg-green-700", "hover:bg-green-600");
      sortOrderButton.classList.remove("bg-red-700", "hover:bg-red-600");
      sortOrderButton.textContent = "Ascending";
    } else {
      sortOrderButton.classList.add("bg-red-700", "hover:bg-red-600");
      sortOrderButton.classList.remove("bg-green-700", "hover:bg-green-600");
      sortOrderButton.textContent = "Descending";
    }
  }

  function resetModal() {
    modalMode = "add";
    modalOverlay.setAttribute("data-modal-mode", modalMode);
    modalOverlay.querySelector("#modalTitle").textContent = "Add Item";
    modalOverlay.querySelector("form").reset();
    modalOverlay.querySelector("form").action = "/items";
    modalOverlay.querySelector('#imagePreview').src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/LOmUR8AAAAASUVORK5CYII=';
  }

  Inputmask({
    alias: "currency",
    rightAlign: false,
    prefix: "₱ ",
    autoUnmask: true,
  }).mask(priceInput);

  addItemButton.addEventListener("click", function () {
    modalOverlay.classList.remove("hidden");
  });

  editButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      fetch(`/items/${button.dataset.itemId}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log(data.item);
            modalMode = "edit";
            modalOverlay.setAttribute("data-modal-mode", modalMode);
            modalOverlay.querySelector("form").reset();
            modalOverlay.querySelector("form").action = `/items/${data.item._id}`;
            modalOverlay.querySelector("form").method = "PUT";

            modalOverlay.querySelector("#modalTitle").textContent = "Edit Item";
            modalOverlay.querySelector("#imagePreview").src = data.item.image;
            modalOverlay.querySelector("#itemName").value = data.item.name;
            modalOverlay.querySelector("#itemDescription").value = data.item.description ?? "";
            modalOverlay.querySelector("#itemQuantity").value = data.item.quantity;
            priceInput.inputmask.setValue(data.item.price);

            modalOverlay.classList.remove("hidden");
          } else {
            Swal.fire({
              title: "Error",
              text: data.message,
              icon: "error",
            });
          }
        });
    });
  });

  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleting item...",
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            onBeforeOpen: () => {
              Swal.showLoading();
            },
          });

          fetch(`/items/${button.dataset.itemId}`, {
            method: "DELETE",
          })
          .then((response) => console.log(response) || response.json())
          .then((data) => {
            if (data.success) {
              Swal.close();
              Swal.fire({
                title: "Item Deleted",
                text: "The item has been deleted.",
                icon: "success",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            } else {
              Swal.close();
              Swal.fire({
                title: "Error",
                text: data.message,
                icon: "error",
              });
            }
          })
          .catch((error) => {
            Swal.close();
            Swal.fire({
              title: "Error",
              text: error,
              icon: "error",
            });
          });
        }
      });
    });
  });

  closeModalButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      resetModal();
      modalOverlay.classList.add("hidden");
    });
  });

  // Optional: Close modal when clicking outside of it
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) {
      resetModal();
      modalOverlay.classList.add("hidden");
    }
  });

  imageFileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("imagePreview").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  saveButton.addEventListener("click", function () {
    Swal.fire({
      title: "Are you sure?",
      text: modalMode === "add" ? "You are about to add this item to the inventory." : "You are about to update this item.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: modalMode === "add" ? "Yes, add it!" : "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: modalMode === "add" ? "Adding item..." : "Updating item...",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });

        const form = modalOverlay.querySelector("form");
        let formData = new FormData(form);

        const url = form.action;
        const method = modalMode === "add" ? "POST" : "PUT";

        formData.set("itemPrice", priceInput.inputmask.unmaskedvalue());

        fetch(url, {
          method: method,
          body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            Swal.close();
            Swal.fire({
              title: modalMode === "add" ? "Item Added" : "Item Updated",
              text: modalMode === "add" ? "The item has been added to the inventory." : "The item has been updated.",
              icon: "success",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          } else {
            Swal.close();
            Swal.fire({
              title: "Error",
              text: data.message,
              icon: "error",
            });
          }
        })
        .catch((error) => {
          Swal.close();
          Swal.fire({
            title: "Error",
            text: error,
            icon: "error",
          });
        });
      }
    });
  });

  updateSortOrderState();

  sortOrderButton.addEventListener("click", function (e) {
    e.preventDefault();
    sortOrderToggle.checked = !sortOrderToggle.checked;
    updateSortOrderState();
  });
});