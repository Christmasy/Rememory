export const getUsers = async () => {
    return await fetch('https://localhost:5001/api/Journey/days?journeyId=2ee7822c-faac-46fe-89fa-ab6559d6fd55', {
        mode: 'no-cors'
    });
};
