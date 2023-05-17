Network Configuration
=====================

    #1  I created a custom VPC "myapp-vpc" that will contains my resource:
        - i passed it argument (vpc_cidr_block, env_prefix) 


    #2  Created subent "myapp-subnet-1" whith its attributes.
        - passed it cidr_black and others as an argument.

    #3  Created internet_getway "myapp-igw" for my vpc.

    #4,5  Created route table "myapp-route-table" and assign it to my vpc.
        -> link both subnet with route table

    #6 ~ 9  Created hosted zone "domain_zone" for my domain with some custom records:
      1 - "domain_record_1": assign its value with my DNS "dataset-collector.online", link the DNS with my ElasticIP which is attched to my EC2 as i mentioned in server configuration section.
      2 - "domain_record_2": assign its value with "www" with type "CNAME", and link with DNS "dataset-collector.online", Finally..Return info about my "domain_zone" to link it manually on Hostinger.

    ======
    Output
    ------
        -  Expose "vpc" and "subnet" output to be used later by  server module.
        - Expose "ns_record_info" output on CLI to copy and link them to Hostinger.

    Variables
    ---------
        - used 5 varaibles (vpc_cidr_block, subnet_cidr_block, avail_zone, env_prefix, server_ip)
            - each one of them used through creating my instance and my network configuration .
            - these varaibles are decalred here, thier values could be assgined via:
                    - passing it through CLI.
                    - hardcode it.
                    - crate .tfvars file (in my case).