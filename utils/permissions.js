export const checkPermission = (role, action) => {
    const permissions = {
        admin: ["view_categories", "create_categories", "update_categories", "delete_categories","view_branches","view_branches","create_branches","update_branches","delete_branches"],
        assistant: ["view_categories", "create_categories", "update_categories"],
        employee: ["view_categories"]

    };

    return permissions[role]?.includes(action);
};