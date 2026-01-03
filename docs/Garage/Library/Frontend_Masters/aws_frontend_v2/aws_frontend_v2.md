# AWS for Fronted Engineers v2  

### Resources  

<https://github.com/stevekinney/aws-v2>  

### Topics  

- 	Hosted on AWS  
- 	Distributed globally  
-	Secured with SSL  
-   Automatically deployed with CI/CD  
-   Dynamically responding to requests    

!!! warning  

	This does not cover servers or serverless architecture  
	
## Setting up AWS account  

Choose Basic Support.  

### Billing Alerts  

Search for the Billing service and select *Receive Free Tier Usage Alerts*.  

### Budgets  

Search for the Budgets service.  

Select a Cost Budget.  

Enter Your budget amount.  

### IAM  

#### Root User 

Root user starts without an API key, for saftey reasons.  

Add two-factor authentication.  

Look for creating an *Account Alias* in the IAM dashboard. This will simplify 
the account id name.  

#### Add User  

Go to Users from IAM Dashboard. Create a new one.  

You can select both AWS credential types *Access Key* and *Password*.  

Set up the first account to replace the root user with Basic Administrative Access, 
this will include most everything but Billing.  

!!! tip "Group Policies"

	Ideally, you would have groups with specific permissions already applied. You 
	would add the new user to the user group. In this tutorial, the permissions are 
	being applied specifically to the user.  
	
Attach the *AdministratorAccess* policy to the first user.  

Tags are meta data added to the user that would be helpful for the organization. 
This tutorial will not be using Tags.  

!!! danger "Access Key"  

	You will be showed the Access Key once. Store the Access Key in a secure area 
	Immediately. If this is lost, the root user will have to regenerate and access 
	key for the user.  
	
Store the Access Key in a secure location.  

Sign out as root user and log in with new administrator account. Setup the two-factor 
authentication for the admin user.  

## S3  

Simple Storage Service. You can store files and host webpages from an S3. 
S3 is called a bucket with key/value storage.  

Uploading is free. You are charged for the storage. You will be charged for requests.  

The bucket needs to be the same name as the website domain name.  For this 
reason, before setting up the S3, check for your domain name availability.  

### Route 53  

AWS Route 53 DNS for registering a domain name. Go to the Route 53 service 
for registering a domain name. This will take some time to register.  

### Create S3 bucket  

!!! tip  

	If you are creating the S3 bucket as a website, the bucket name must be the 
	same as your registered domain name, like "catherding.com"  
	
Search for the S3 service. Create the bucket.  

Select ACLs disabled.  

If the bucket is for a website, you will have to temporarily *Un-Block all public access*. 
Later this will have to be turned back on, but if it is regular storage, leave 
the box checked. Do not allow public access.  

Don't need server side encrytion or advanced settings.  

### Setting up policies for the bucket  

You will set up a policy allowing anyone to read from the bucket, but nothing else. 
This will allows people to visit the site.  

Go to the bucket. Open up the permissions. Look at the policies.  

When looking at the JSON of the policies, *Principal* is who the policy applies to, 
*Effect* is either allowing or blocking the principal, *Action* is what the principal 
is doing, and *Resource* is what the action is on.  

There is a *Policy Generator* button. Click on this and for allowing people on the 
internet to see the S3 bucket's website, you will set:  

**Effect**: Allow  
**Principle**: \*  
**AWS Service**: null  
**Actions**: 1 Action(s) Selected  
**Resource Name**: arn:aws:s3:::bucketName/keyName  

``` json  
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME_HERE/*"
    }
  ]
}
```

You can then copy the generated policy and add it back to the bucket policies. 
He added `*` for the keyName above.  

#### Upload a Test page  

You can upload any html file as the test website. Start from the S3 bucket, there 
should be a button that says *Upload*. Select it and upload a simple html file. 
You can compy the url for th html from the S3 bucket for the html file and paste 
that into the browser to see it online.  

To improve on the url there is an option on the S3 bucket for hosting a static website.

Scroll down in the options on *Properties* on the S3 bucket until you find *Static website hosting*. 
Choose *Edit* and select enable. Add the name of the file for the site's index.html.  

## AWS CLI  

Install the AWS CLI. You can look up how to add multiple credentials for multiple 
users.  

### Commands and Deploying  

Show the contents of a bucket:  

`aws s3 ls s3://bucketName`

I guess you can open the AWS cli inside a React project. Run `npm install` if the 
React project was recently cloned. Build the project with `npm run build`.  

Copy the build folder to your bucket:  
`aws s3 cp build s3://bicketName --recursive`  

The build of the files should now be showing up in the bucket. You can visit 
the website. But the urls will not work and the site is not secure.  

### Adding the registered domain  

Go to Route 53 and find your registed domain. If you don't intend on keeping the 
domain for more than a year, *cancel auto-renewal*.  

On the domain name, select *Manage DNS*, click on the comain name and select 
*Details*. There is a toggle for *Alias*, switch it to on. You can select from 
the Alias dropdown to select *Route Traffic To* your S3 bucket. Select S3 bucket, 
then region, and the bucket you want to direct the domain to. When done, click 
Create Record.  

### Register SSL certificate  

Find the *Amazon Certificate Manager Service*. Request a public certificate. In the 
example he creates two fully qualified domain names for his site, one with 'www.' 
and one without it.  

DNS validation is the easiest way to do it.  

NOT DONE YET! You have to the domains and click "Create records in Route 53".  

### www Redirect  


  
 




