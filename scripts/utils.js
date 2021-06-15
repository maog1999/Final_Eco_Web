function dateManage(month, day) {
    let dateText;

    switch (month) {
        case 5:
            dateText = "Jun " + day;

            break;
        case 6:
            dateText = "Jul " + day;

            break;

        case 6:
            dateText = "Agos " + day;

            break;


        default:
            break;
    }

    return dateText;
}