export function validateAuctionRequest(body: any) {
    const { imageUrl, title, description, startingPrice, endTime } = body;

    if (
        typeof imageUrl !== 'string' ||
        typeof title !== 'string' ||
        typeof description !== 'string' ||
        typeof startingPrice !== 'number' ||
        !endTime
    ) {
        return false;
    }
    return true;
}