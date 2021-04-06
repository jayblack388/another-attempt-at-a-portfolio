import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import RepoCard from './repoCard';
import useThemeContext from '../hooks/themeContext';

function Projects() {
	const { style } = useThemeContext();
	const {
		github: {
			viewer: { pinnedItems },
		},
	} = useStaticQuery(
		graphql`
			query {
				github {
					viewer {
						name
						pinnedItems(first: 6) {
							nodes {
								... on GitHub_Repository {
									id
									name
									owner {
										login
									}
									url
									description
									stargazers {
										totalCount
									}
									homepageUrl
									forkCount
								}
							}
						}
					}
				}
			}
		`
	);
	return (
		<>
			<h2 className={style === 'dark' ? 'text-white' : ''}>
				My Projects
			</h2>
			<p
				className={`f4 mb-4 ${
					style === 'dark' ? 'text-white' : 'text-gray'
				}`}>
				GitHub repositories that I've built.
			</p>
			<div className='d-sm-flex flex-wrap gutter-condensed mb-4'>
				{pinnedItems.nodes.map((repository, i) => (
					<div
						key={i}
						className='col-sm-6 col-md-12 col-lg-6 col-xl-4 mb-3'>
						<RepoCard repository={repository} />
					</div>
				))}
			</div>
		</>
	);
}

export default Projects;
