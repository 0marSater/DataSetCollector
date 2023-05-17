Instance Configuration
====================
    #1  I created a custom secrutiy group to be attached to my Instnce, which Exposed five ports:
        1 - Port 22 num_1 to enable ssh (can be restrict to only my ip)
        2 - Port 80 for the React frontend container.
        3 - Port 8080 the default one for Jenkins.
        4 - Port 5000 for the Flask backend container (custmize my front to this port in the source code). 
        5 - Finally, expose outpound port to all ips.


    #2  Then i feteched the aws_ami data an passed it to create instance with specific ami (usually the lastet one).

    #3  in instance section, i created instance with specific attributes, some of them hardcoded and other passed as an argument like (instance_type, subnet_id, availability_zone, tag.env_prefix).

    #4  After that, i created static ElasticIP and assocaited it to my server to aviode dynamically assign ip which will elads to consusion with my DNS server later.

    #5  Finally, assigning ElasticIP to my ec2 instance using both allocation_id and instance_id thorugh "aws_eip_association" resource.

    ======
    Output
    ------
        -  Expose "instance-ip" output to be used later by output.tf root module which will be print on CLI 


    Variables
    ---------
        - used 5 varaibles (vpc_id, subnet_id, instance_type, avail_zone, env_prefix)
            - each one of them used through creating my instance as i explained above.
            - these varaibles are decalred here, thier values could be assgined via:
                    - passing it through CLI.
                    - hardcode it.
                    - crate .tfvars file (in my case).
