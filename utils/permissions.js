export const checkPermission = (role, action) => {
    const permissions = {
        admin: ["view_roles", "create_roles", "create_users", "view_users", "view_users_id", "update_users", "delete_users",
                "view_categories", "create_categories", "update_categories", "delete_categories",
                "view_products", "view_products_id", "create_products", "update_products", "delete_products",
                "view_providers", "view_providers_id", "create_providers", "update_providers", "delete_providers",
                "view_purchases", "view_purchases_id", "create_purchases", "update_purchases", "delete_purchases",
                "view_branches","view_branches","create_branches","update_branches","delete_branches", "view_customers",
                "reate_customers","update_customers","delete_customers","view_quotations","create_quotations",
                "update_quotations","delete_quotations","view_sales_report","view_top_customers","view_top_products"],
        assistant: ["view_roles", "create_users", "view_users", "view_users_id", "update_users",
                "view_categories", "create_categories", "update_categories","view_customers",
                "view_products", "create_products", "update_products", "delete_products",
                "view_providers", "view_providers_id", "create_providers", "update_providers",
                "view_purchases", "view_purchases_id", "create_purchases", "update_purchases",
                "reate_customers","update_customers","view_quotations","create_quotations",
                "update_quotations","view_sales_report","view_top_customers","view_top_products"],
        employee: ["view_categories", "view_products", "view_customers","view_quotations","view_sales_report","view_top_customers","view_top_products"]

    };

    return permissions[role]?.includes(action);
};