var Time = /** @class */ (function () {
    function Time(date) {
        this.now = new Date();
        this.past = new Date(date);
        this.difference = this.now.getTime() / 1000 - this.past.getTime() / 1000;
        this.hour = Math.floor(this.difference / 3600);
        this.diff = this.difference - this.hour * 3600;
        this.minute = Math.floor(this.diff / 60);
        this.day = Math.floor(this.hour / 24);
        this.week = Math.floor(this.day / 7);
        this.month = Math.floor(this.week / 4.345);
        this.year = Math.floor(this.month / 12);
    }
    Time.prototype.format = function (level, format) {
        if (["easy", "medium", "hard"].includes(level) === false) {
            throw new Error("Level Not Found");
        }
        if (["normal", "short"].includes(format) === false) {
            throw new Error("Format Not Found");
        }
        var date = this.past.getDate();
        var year = this.past.getFullYear();
        var day = this.getNameOfDay(this.past.getDay(), format);
        var month = this.getNameOfMonth(this.past.getMonth(), format);
        var formatDate = {
            easy: month + " " + year,
            medium: month + " " + date + ", " + year,
            hard: day + ", " + month + " " + date + ", " + year
        };
        return formatDate[level];
    };
    Time.prototype.fromNow = function (format) {
        if (["normal", "short"].includes(format) === false) {
            throw new Error("Format Not Found");
        }
        if (format === "short")
            return this.getShortRt();
        if (format === "normal")
            return this.getNormalRt();
    };
    Time.prototype.getNameOfDay = function (numberOfDay, format) {
        if (["normal", "short"].includes(format) === false) {
            throw new Error("Format Not Found");
        }
        var days = {
            1: format === "normal" ? "Sunday" : "Sun",
            2: format === "normal" ? "Monday" : "Mon",
            3: format === "normal" ? "Tuesday" : "Tues",
            4: format === "normal" ? "Wednesday" : "Wed",
            5: format === "normal" ? "Thursday" : "Thurs",
            6: format === "normal" ? "Friday" : "Fri",
            7: format === "normal" ? "Saturday" : "Sat"
        };
        return days[numberOfDay + 1];
    };
    Time.prototype.getNameOfMonth = function (numberOfMonth, format) {
        if (["normal", "short"].includes(format) === false) {
            throw new Error("Format Not Found");
        }
        var months = {
            1: format === "normal" ? "January" : "Jan",
            2: format === "normal" ? "February" : "Feb",
            3: format === "normal" ? "March" : "Mar",
            4: format === "normal" ? "April" : "Apr",
            5: format === "normal" ? "May" : "May",
            6: format === "normal" ? "June" : "Jun",
            7: format === "normal" ? "July" : "Jul",
            8: format === "normal" ? "August" : "Aug",
            9: format === "normal" ? "September" : "Sept",
            10: format === "normal" ? "October" : "Oct",
            11: format === "normal" ? "November" : "Nov",
            12: format === "normal" ? "December" : "Dec"
        };
        return months[numberOfMonth + 1];
    };
    Time.prototype.getShortRt = function () {
        if (this.now.getFullYear() !== this.past.getFullYear()) {
            return this.getNameOfMonth(this.past.getMonth(), "short") + " " + this.past.getDate() + ", " + this.past.getFullYear();
        }
        if (this.month > 0 || this.day > 0) {
            return this.getNameOfMonth(this.past.getMonth(), "short") + " " + this.past.getDate();
        }
        if (this.hour > 0) {
            return this.hour + "h";
        }
        if (this.minute > 0) {
            return this.minute + "m";
        }
        return Math.floor(this.difference) + " seconds ago";
    };
    Time.prototype.getNormalRt = function () {
        if (this.year > 0) {
            return this.year === 1 ? "a year ago" : this.year + " years ago";
        }
        if (this.month > 0) {
            return this.month === 1 ? "a month ago" : this.month + " months ago";
        }
        if (this.week > 0) {
            return this.week === 1 ? "a week ago" : this.week + " weeks ago";
        }
        if (this.day > 0) {
            return this.day === 1 ? "a day ago" : this.day + " days ago";
        }
        if (this.hour > 0) {
            return this.hour === 1 ? "an hour ago" : this.hour + " hours ago";
        }
        if (this.minute > 0) {
            return this.minute === 1
                ? "a minute ago"
                : this.minute + " minutes ago";
        }
        return Math.floor(this.difference) + " seconds ago";
    };
    return Time;
}());
var time = new Time("2021-01-05T14:54:12.099Z");
console.log(time.format("easy", "short"));
console.log(time.format("medium", "short"));
console.log(time.format("hard", "short"));
console.log("\n");
console.log(time.format("easy", "normal"));
console.log(time.format("medium", "normal"));
console.log(time.format("hard", "normal"));
console.log("\n");
console.log(time.fromNow("short"));
console.log(time.fromNow("normal"));
