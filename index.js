export default function semverRegex() {
	return /(?<=^v?|\sv?)(?:(?:0|[1-9]\d{0,9}?)\.){2}(?:0|[1-9]\d{0,9})(?:-(?:0|[1-9]\d*|[\da-z-]*?[a-z-][\da-z-]*?)){0,100}?(?=$| |\+|\.)(?:(?<=-\S+)(?:\.(?:[\da-z-]*?[a-z-][\da-z-]*|0|[1-9]\d*)){1,100}?)?(?!\.)(?:\+(?:[\da-z-]+(?:\.[\da-z-]+)*){1,100}?(?!\w))?(?!\+)/gi;
}

export const SEMVER_REGEX = semverRegex();
