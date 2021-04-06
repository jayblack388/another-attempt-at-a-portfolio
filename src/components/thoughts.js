import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PostCard from './postCard';
import useThemeContext from '../hooks/themeContext';

function Thoughts() {
	const today = new Date().toISOString().slice(0, 10);
	const { style } = useThemeContext();
	const {
		allMarkdownRemark: { edges },
	} = useStaticQuery(
		graphql`
			query {
				allMarkdownRemark(limit: 6) {
					edges {
						node {
							frontmatter {
								title
								tags
								excerpt
							}
							fields {
								slug
								postDate
							}
							html
						}
					}
				}
			}
		`
	);
	const filteredEdges = edges
		.filter(edge => edge.node.fields.postDate <= today)
		.sort((a, b) => {
			const aDate = a.node.fields.postDate;
			const bDate = b.node.fields.postDate;
			if (aDate < bDate) {
				return -1;
			}
			if (aDate > bDate) {
				return 1;
			}

			// names must be equal
			return 0;
		});
	return filteredEdges.length > 0 ? (
		<>
			<h2 className={style === 'dark' ? 'text-white' : ''}>
				My Thoughts
			</h2>
			<p
				className={`f4 mb-4 ${
					style === 'dark' ? 'text-white' : 'text-gray'
				}`}>
				Articles I've written.
			</p>
			<div className='d-sm-flex flex-wrap gutter-condensed mb-4'>
				{filteredEdges.map((edge, index) => (
					<div
						key={index}
						className='col-sm-6 col-md-12 col-lg-6 col-xl-4 mb-3'>
						<PostCard post={edge.node} />
					</div>
				))}
			</div>
		</>
	) : null;
}

export default Thoughts;
