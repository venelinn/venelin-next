// pages/api/preview.js
export default async function handler(req, res) {
	const { secret, id } = req.query

	// 1. Check the secret
	if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !id) {
		return res.status(401).json({ message: "Invalid token" })
	}

	// You don't need to fetch the slug, but you should fetch the entry
	// by ID to ensure it exists before enabling preview mode.
	// const entryExists = await fetchEntryById(id);

	// 2. Enable Preview Mode
	res.setPreviewData({})

	// 3. Redirect to the Home Page (the root path)
	// The 'slug' from the query is '/'.
	res.redirect(307, "/")
}
