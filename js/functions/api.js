
/**
 * Fetch avec gestion d'erreur
 * @param {string} url
 */
export const getVersions = async (url) => {

    let response

    try {
        response = await fetch(url)
    } catch (e) {
        throw e
    }

    if (!response.ok) {
        throw new Error("impossible de trouver les verions")
    }

    return response.json()
}

/**
 * fetchAllVersions permet de fetch les versions de php et les versions de piwigo et de les formatés en tableau exploitable
 * @returns {{ phpVersions: string[], piwigoVersions: string[] }}
 */
export const fetchAllVersions = async () => {
    try {

        /*  CHOIX 1 : si les api ne marchent pas tester avec des tableaux bruts  */

        // Si les api ne marchent pas il y a toujours la possibilité d'essayer avec des tableaux brut
        const phpVersions = ["8.6", "8.5", "8.4", "8.3", "8.2", "8.1", "8.0"];
        const piwigoVersions = ["16.2.0", "16.1.0", "16.0.0", "15.7.0", "15.6.0", "15.5.0", "15.4.0", "15.3.0", "15.2.0", "15.1.0", "15.0.0"];

        /*  CHOIX 2 : fetch les versions de php et de piwigo  */

        // const piwigoData = await getVersions("https://api.github.com/repos/Piwigo/Piwigo/releases?per_page=19")
        // const phpData = await getVersions("https://corsproxy.io/?https://php.watch/api/v1/versions/records")

        // const piwigoVersions = piwigoData.filter((r) => r.prerelease == false).map(r => r.tag_name);
        // const phpVersions = Object.values(phpData.data).map(e => e.name).slice(-7).reverse();

        return { phpVersions, piwigoVersions }
    } catch (e) {
        console.error("Erreur récupération versions : ", e);
    }
};