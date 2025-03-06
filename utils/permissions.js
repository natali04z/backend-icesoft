export const checkPermission = (role, action) => {
    const permissions = {
        admin: ["view_categories", "create_categories", "update_categories", "delete_categories", "view_customers",
                "reate_customers","update_customers","delete_customers","view_quotations","create_quotations",
                "update_quotations","delete_quotations","view_sales_report","view_top_customers","view_top_products"],
        assistant: ["view_categories", "create_categories", "update_categories","view_customers",
                "reate_customers","update_customers","view_quotations","create_quotations",
                "update_quotations","view_sales_report","view_top_customers","view_top_products"],
        employee: ["view_categories", "view_customers","view_quotations","view_sales_report","view_top_customers","view_top_products"]
    };

    return permissions[role]?.includes(action);
};