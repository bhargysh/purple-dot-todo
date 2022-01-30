interface Filter {
    name: string
}

interface ShowAll extends Filter {
    name: "SHOW_ALL"
}

interface ShowCompleted extends Filter {
    name: "SHOW_COMPLETED"
}

interface ShowActive extends Filter {
    name: "SHOW_ACTIVE"
}

interface ClearAll extends Filter {
    name: "CLEAR_ALL"
}

export default Filter;
