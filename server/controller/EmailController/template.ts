const getEmailTemplate = (baseUrl: string, username: string,id: string) => {
    return `
        <div>
        <h1>Bestätigen sie Ihre Mail!</h1>
        <p>Hallo ${username}, Klicken sie auf den Link unten um Ihre Mail zu bestätigen</p>
        <a href="${baseUrl}/confirm/${id}">Confirm Email</a>
        </div>
    `;
}

export default getEmailTemplate;