class UserRole {
    constructor(id, name, canEdit = false, canDelete = false) {
        this.id = id;
        this.name = name;
        this.canEdit = canEdit;
        this.canDelete = canDelete;
    }
}