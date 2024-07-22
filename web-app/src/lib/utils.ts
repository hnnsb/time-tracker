export function getCurrentTimeAdjusted() {
    const now = new Date();
// 2. Get the timezone offset of the browser in minutes and convert it to milliseconds.
    const timezoneOffsetMs = now.getTimezoneOffset() * 60000;
// 3. Adjust the time to UTC by subtracting the timezone offset.
    return new Date(now.getTime() - timezoneOffsetMs);
}
