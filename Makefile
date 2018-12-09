setup:
	git flow init
	ln -nfs $(PWD)/.githooks/bump-version.sh .git/hooks/post-flow-release-start
	ln -nfs $(PWD)/.githooks/bump-version.sh .git/hooks/post-flow-hotfix-start
	cd install -g serverless
	cd src && npm install

local:
	docker-compose up
	cd src && serverless offline start --stage dev

fixcode:
	cd src && npm run fixcode
