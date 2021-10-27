
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * Calculates the difference between two timestamps, returns a quadruple with
 * the difference in days, hours, minutes and seconds.
 *
 * @param {number} future
 */
const timestampDiff =
    future =>
    /** @param {number} past */
    past =>
        [DAY, HOUR, MINUTE, SECOND].map((time, index, times) => {
            const diff = future - past;
            const previousTime = times[index - 1];



            return (
                Math.floor(diff / time) -
                (Math.floor(diff / previousTime) * (previousTime / time) || 0)
            );
        });

/**
 * Start timer and set the content of the element.
 *
 * @param {string} date
 */
const timer =
    date =>
    /** @param {HTMLElement} target */
    target => {
        const diff = timestampDiff(Date.parse(date));

        return setInterval(() => {
            const [days, hours, minutes, seconds] = diff(Date.now());

            // Ideally we should have targets for every element
            // to avoid updating the entire innerHTML of the container with
            // every tick.
            target.innerHTML = `
                <div>${days}<span>dni</span></div>
                <div>${hours}<span>ur</span></div>
                <div>${minutes}<span>minut</span></div>
                <div>${seconds}<span>sekund</span></div>
            `;
        }, SECOND);
    };

// We finally run it (and we save the interval return value if we want to stop it later)
const interval = timer("oct 26, 2021 23:07:00")(document.querySelector("#timer"));
