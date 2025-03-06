export const checkPermission = (role, action) => {
    const permissions = {
        admin: ["view_categories", "create_categories", "update_categories", "delete_categories"],
        assistant: ["view_categories", "create_categories", "update_categories"],
        employee: ["view_categories"]
    };

    return permissions[role]?.includes(action);
};