const API_URL = "http://localhost:3001/api/categories";

let allCategories = [];
let originalCategories = [];
let currentPage = 1;
const rowsPerPage = 10;

// Render categories table
const renderCategoriesTable = (page = 1) => {
    const tbody = document.getElementById("categoryTableBody");
    tbody.innerHTML = "";
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const categoriesToShow = allCategories.slice(start, end);

    categoriesToShow.forEach(category => {
        tbody.innerHTML += `
            <tr>
                <td>${category.id}</td>
                <td>${category.name}</td>
                <td>${category.description}</td>
                <td>
                    <label class="switch">
                        <input type="checkbox" ${category.status === "active" ? "checked" : ""} disabled>
                        <span class="slider round"></span>
                    </label>
                </td>
                <td>
                    <div class="action-buttons">
                        <button onclick="fillEditForm('${category._id}')" class="icon-button edit-button" title="Editar">
                            <i class="material-icons">edit</i>
                        </button>
                        <button onclick="deleteCategory('${category._id}')" class="icon-button delete-button" title="Eliminar">
                            <i class="material-icons">delete</i>
                        </button>
                    </div>
                </td>
            </tr>`;
    });
    renderPaginationControls();
};

// Render pagination controls (you'll need to implement this function)
const renderPaginationControls = () => {
    const totalPages = Math.ceil(allCategories.length / rowsPerPage);
    const paginationContainer = document.getElementById("paginationContainer");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.onclick = () => {
            currentPage = i;
            renderCategoriesTable(currentPage);
        };
        paginationContainer.appendChild(pageButton);
    }
};

const listCategories = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            showError("Token no encontrado. Inicie sesión nuevamente.");
            return;
        }
        
        const res = await fetch(API_URL, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            }
        });

        const data = await res.json();
        console.log("Respuesta de la API:", data); // Verifica qué devuelve la API

        if (res.ok && data.categories) {
            originalCategories = data.categories;
            allCategories = [...originalCategories];
            currentPage = 1;
            renderCategoriesTable(currentPage);
        } else {
            showError(data.message || "No tienes permisos para listar categorías.");
        }
    } catch (err) {
        console.error("Error al listar categorías:", err);
        showError("Error al listar categorías");
    }
};


// Show register form
const showRegisterForm = () => {
    hideForms();
    document.getElementById("registerFormSection").style.display = "block";
    document.getElementById("formTitle").textContent = "Registrar Categoría";
    window.scrollTo(0, document.body.scrollHeight);
};

// Register a new category
const registerCategory = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        showError("Token no encontrado. Inicie sesión nuevamente.");
        return;
    }
    
    const name = document.getElementById("name").value.trim();
    const description = document.getElementById("description").value.trim();
    const status = document.getElementById("status").checked ? "active" : "inactive";
    
    if (!name || !description) {
        showValidation("Todos los campos son obligatorios.");
        return;
    }

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({ name, description, status })
        });
        
        const data = await res.json();
        if (res.ok) {
            showSuccess("Categoría registrada correctamente.");
            hideForms();
            listCategories();
            document.getElementById("registerForm").reset(); // Reset form after successful registration
        } else {
            showError(data.message || "Error al registrar categoría.");
        }
    } catch (err) {
        console.error("Error al registrar categoría:", err);
        showError("Error al registrar categoría");
    }
};

// Llenar el formulario de edición con los datos de la categoría
const fillEditForm = async (id) => {
    try {
        console.log("Obteniendo categoría con ID:", id);

        const token = localStorage.getItem("token");
        if (!token) {
            console.log("Token no encontrado");
            showError("Token no encontrado. Inicie sesión nuevamente.");
            return;
        }

        const res = await fetch(`${API_URL}/${id}`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            }
        });

        console.log("Estado HTTP:", res.status);
        const category = await res.json();
        console.log("Datos de la categoría:", category);

        if (res.ok) {
            hideForms(); // Ocultar otros formularios si es necesario
            document.getElementById("editName").value = category.name || "";
            document.getElementById("editDescription").value = category.description || "";
            document.getElementById("editStatus").checked = category.status === "active";
            document.getElementById("editFormSection").style.display = "block";
            document.getElementById("editForm").dataset.categoryId = id;
        } else {
            console.log("Error en la respuesta:", category.message);
            showError(category.message || "Error al obtener los datos de la categoría.");
        }
    } catch (err) {
        console.error("Error al obtener la categoría:", err);
        showError("Error al obtener la categoría.");
    }
};

const updateCategory = async () => {
    const token = localStorage.getItem("token");
    // Asegúrate de usar el mismo atributo que asignaste al cargar el formulario:
    const id = document.getElementById("editForm").dataset.categoryId; 
  
    if (!token) {
      showError("Token no encontrado. Inicie sesión nuevamente.");
      return;
    }
  
    const updatedCategory = {
      name: document.getElementById("editName").value.trim(),
      description: document.getElementById("editDescription").value.trim(),
      // Asumimos que en el formulario de edición el checkbox tiene id "editStatus"
      status: document.getElementById("editStatus").checked ? "active" : "inactive",
    };
  
    console.log("Actualizando categoría con datos:", updatedCategory);
  
    if (!updatedCategory.name || !updatedCategory.description) {
      showValidation("Todos los campos son obligatorios.");
      return;
    }
  
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedCategory)
      });
  
      const data = await res.json();
      console.log("Respuesta del servidor:", data);
  
      if (res.ok) {
        showSuccess("Categoría actualizada correctamente.");
        hideForms();
        listCategories();
      } else {
        showError(data.message || "Error al actualizar la categoría.");
      }
    } catch (err) {
      console.error("Error al actualizar la categoría:", err);
      showError("Error al actualizar la categoría.");
    }
  };
  

// Delete category
const deleteCategory = async (id) => {
    const token = localStorage.getItem("token");
    const confirmed = await showConfirm({ 
        title: "¿Eliminar categoría?", 
        text: "Esta acción no se puede deshacer.", 
        confirmText: "Eliminar", 
        cancelText: "Cancelar" 
    });
    
    if (!confirmed) return;
    
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        
        const data = await res.json();
        if (res.ok) {
            showSuccess("Categoría eliminada");
            listCategories();
        } else {
            showError(data.message || "No se pudo eliminar la categoría");
        }
    } catch (err) {
        console.error("Error al eliminar categoría:", err);
        showError("Error al eliminar categoría");
    }
};

// Search category
const searchCategory = () => {
    const term = document.getElementById("searchInput").value.toLowerCase().trim();
    allCategories = term 
        ? originalCategories.filter(c => 
            c.name.toLowerCase().includes(term) || 
            c.description.toLowerCase().includes(term)
          ) 
        : [...originalCategories];
    currentPage = 1;
    renderCategoriesTable(currentPage);
};

// Hide all forms
const hideForms = () => {
    document.getElementById("registerFormSection").style.display = "none";
    document.getElementById("editFormSection").style.display = "none";
};

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    listCategories();
    
    // Mobile add button
    const mobileAddButton = document.getElementById("mobileAddButton");
    if (mobileAddButton) {
        mobileAddButton.onclick = showRegisterForm;
    }

    // Register button
    const registerButton = document.getElementById("registerButton");
    if (registerButton) {
        registerButton.onclick = registerCategory;
    }

    // Cancel edit button
    const cancelEditButton = document.getElementById("cancelEditButton");
    if (cancelEditButton) {
        cancelEditButton.onclick = () => {
            document.getElementById("editForm").reset();
            document.getElementById("editFormSection").style.display = "none";
        };
    }

    // Update button
    const updateButton = document.getElementById("updateButton");
    if (updateButton) {
        updateButton.onclick = updateCategory;
    }

    // Search input
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keyup", searchCategory);
    }
});

// Expose functions to global scope
window.fillEditForm = fillEditForm;
window.deleteCategory = deleteCategory;
window.showRegisterForm = showRegisterForm;