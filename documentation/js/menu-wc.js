'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">DIN-DIN.v2</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AccountModule.html" data-type="entity-link" >AccountModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AccountModule-79eafef44642a5cf554596d3d0f3917bdffe7167d30421ed85d231f08ef94078ed038876e2b21fc363906cbe3cbe267a5327a3d0ca15627f9b487c41bee28a77"' : 'data-bs-target="#xs-controllers-links-module-AccountModule-79eafef44642a5cf554596d3d0f3917bdffe7167d30421ed85d231f08ef94078ed038876e2b21fc363906cbe3cbe267a5327a3d0ca15627f9b487c41bee28a77"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AccountModule-79eafef44642a5cf554596d3d0f3917bdffe7167d30421ed85d231f08ef94078ed038876e2b21fc363906cbe3cbe267a5327a3d0ca15627f9b487c41bee28a77"' :
                                            'id="xs-controllers-links-module-AccountModule-79eafef44642a5cf554596d3d0f3917bdffe7167d30421ed85d231f08ef94078ed038876e2b21fc363906cbe3cbe267a5327a3d0ca15627f9b487c41bee28a77"' }>
                                            <li class="link">
                                                <a href="controllers/CreateAccountController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateAccountController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/GetAccountByIdController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GetAccountByIdController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AccountModule-79eafef44642a5cf554596d3d0f3917bdffe7167d30421ed85d231f08ef94078ed038876e2b21fc363906cbe3cbe267a5327a3d0ca15627f9b487c41bee28a77"' : 'data-bs-target="#xs-injectables-links-module-AccountModule-79eafef44642a5cf554596d3d0f3917bdffe7167d30421ed85d231f08ef94078ed038876e2b21fc363906cbe3cbe267a5327a3d0ca15627f9b487c41bee28a77"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AccountModule-79eafef44642a5cf554596d3d0f3917bdffe7167d30421ed85d231f08ef94078ed038876e2b21fc363906cbe3cbe267a5327a3d0ca15627f9b487c41bee28a77"' :
                                        'id="xs-injectables-links-module-AccountModule-79eafef44642a5cf554596d3d0f3917bdffe7167d30421ed85d231f08ef94078ed038876e2b21fc363906cbe3cbe267a5327a3d0ca15627f9b487c41bee28a77"' }>
                                        <li class="link">
                                            <a href="injectables/CreateAccountUseCase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateAccountUseCase</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GetAccountByIdUseCase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GetAccountByIdUseCase</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaAccountRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaAccountRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-b57cd881882fd2b26a7d8ded3e0ec2952a9df1cfdc164aa703ac4dd96e43760d8ab77e3494b5edde122483ad815c395a051dbe2f3fba9ad1840152ca7c270fd9"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-b57cd881882fd2b26a7d8ded3e0ec2952a9df1cfdc164aa703ac4dd96e43760d8ab77e3494b5edde122483ad815c395a051dbe2f3fba9ad1840152ca7c270fd9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-b57cd881882fd2b26a7d8ded3e0ec2952a9df1cfdc164aa703ac4dd96e43760d8ab77e3494b5edde122483ad815c395a051dbe2f3fba9ad1840152ca7c270fd9"' :
                                            'id="xs-controllers-links-module-AuthModule-b57cd881882fd2b26a7d8ded3e0ec2952a9df1cfdc164aa703ac4dd96e43760d8ab77e3494b5edde122483ad815c395a051dbe2f3fba9ad1840152ca7c270fd9"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-b57cd881882fd2b26a7d8ded3e0ec2952a9df1cfdc164aa703ac4dd96e43760d8ab77e3494b5edde122483ad815c395a051dbe2f3fba9ad1840152ca7c270fd9"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-b57cd881882fd2b26a7d8ded3e0ec2952a9df1cfdc164aa703ac4dd96e43760d8ab77e3494b5edde122483ad815c395a051dbe2f3fba9ad1840152ca7c270fd9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-b57cd881882fd2b26a7d8ded3e0ec2952a9df1cfdc164aa703ac4dd96e43760d8ab77e3494b5edde122483ad815c395a051dbe2f3fba9ad1840152ca7c270fd9"' :
                                        'id="xs-injectables-links-module-AuthModule-b57cd881882fd2b26a7d8ded3e0ec2952a9df1cfdc164aa703ac4dd96e43760d8ab77e3494b5edde122483ad815c395a051dbe2f3fba9ad1840152ca7c270fd9"' }>
                                        <li class="link">
                                            <a href="injectables/AuthGuard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaAuthRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaAuthRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabaseModule-84de0e98d820e2e0ca547533d499a3a6d998f2ef07a524ae09f5738749a63de2a3f52660816dd3e17a2658d381bb05208e776ead90f158be808fe75b59b3cd0a"' : 'data-bs-target="#xs-injectables-links-module-DatabaseModule-84de0e98d820e2e0ca547533d499a3a6d998f2ef07a524ae09f5738749a63de2a3f52660816dd3e17a2658d381bb05208e776ead90f158be808fe75b59b3cd0a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabaseModule-84de0e98d820e2e0ca547533d499a3a6d998f2ef07a524ae09f5738749a63de2a3f52660816dd3e17a2658d381bb05208e776ead90f158be808fe75b59b3cd0a"' :
                                        'id="xs-injectables-links-module-DatabaseModule-84de0e98d820e2e0ca547533d499a3a6d998f2ef07a524ae09f5738749a63de2a3f52660816dd3e17a2658d381bb05208e776ead90f158be808fe75b59b3cd0a"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaUserRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaUserRepository</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaymentModule.html" data-type="entity-link" >PaymentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PaymentModule-9b78a366e004784bb3deee678321d828e785ecbec3396469e39d4bcca6f1c7d987cce79770e4d2ded8fb1d89c63b6ca2357268b88eaf318c3033268da95c23c1"' : 'data-bs-target="#xs-controllers-links-module-PaymentModule-9b78a366e004784bb3deee678321d828e785ecbec3396469e39d4bcca6f1c7d987cce79770e4d2ded8fb1d89c63b6ca2357268b88eaf318c3033268da95c23c1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PaymentModule-9b78a366e004784bb3deee678321d828e785ecbec3396469e39d4bcca6f1c7d987cce79770e4d2ded8fb1d89c63b6ca2357268b88eaf318c3033268da95c23c1"' :
                                            'id="xs-controllers-links-module-PaymentModule-9b78a366e004784bb3deee678321d828e785ecbec3396469e39d4bcca6f1c7d987cce79770e4d2ded8fb1d89c63b6ca2357268b88eaf318c3033268da95c23c1"' }>
                                            <li class="link">
                                                <a href="controllers/CreatePaymentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreatePaymentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaymentModule-9b78a366e004784bb3deee678321d828e785ecbec3396469e39d4bcca6f1c7d987cce79770e4d2ded8fb1d89c63b6ca2357268b88eaf318c3033268da95c23c1"' : 'data-bs-target="#xs-injectables-links-module-PaymentModule-9b78a366e004784bb3deee678321d828e785ecbec3396469e39d4bcca6f1c7d987cce79770e4d2ded8fb1d89c63b6ca2357268b88eaf318c3033268da95c23c1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaymentModule-9b78a366e004784bb3deee678321d828e785ecbec3396469e39d4bcca6f1c7d987cce79770e4d2ded8fb1d89c63b6ca2357268b88eaf318c3033268da95c23c1"' :
                                        'id="xs-injectables-links-module-PaymentModule-9b78a366e004784bb3deee678321d828e785ecbec3396469e39d4bcca6f1c7d987cce79770e4d2ded8fb1d89c63b6ca2357268b88eaf318c3033268da95c23c1"' }>
                                        <li class="link">
                                            <a href="injectables/CreatePaymentUseCase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreatePaymentUseCase</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaAccountRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaAccountRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaPaymentRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaPaymentRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-6ef5709d38051f89459357cfea1450d83c6ab179c7c35d021a03696a95416a859a0bcbb6f163f404d9a834d12596516bf6d6a988bd6e60a5008f223144fda3bd"' : 'data-bs-target="#xs-controllers-links-module-UserModule-6ef5709d38051f89459357cfea1450d83c6ab179c7c35d021a03696a95416a859a0bcbb6f163f404d9a834d12596516bf6d6a988bd6e60a5008f223144fda3bd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-6ef5709d38051f89459357cfea1450d83c6ab179c7c35d021a03696a95416a859a0bcbb6f163f404d9a834d12596516bf6d6a988bd6e60a5008f223144fda3bd"' :
                                            'id="xs-controllers-links-module-UserModule-6ef5709d38051f89459357cfea1450d83c6ab179c7c35d021a03696a95416a859a0bcbb6f163f404d9a834d12596516bf6d6a988bd6e60a5008f223144fda3bd"' }>
                                            <li class="link">
                                                <a href="controllers/CreateUserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateUserController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/GetUserByEmailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GetUserByEmailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-6ef5709d38051f89459357cfea1450d83c6ab179c7c35d021a03696a95416a859a0bcbb6f163f404d9a834d12596516bf6d6a988bd6e60a5008f223144fda3bd"' : 'data-bs-target="#xs-injectables-links-module-UserModule-6ef5709d38051f89459357cfea1450d83c6ab179c7c35d021a03696a95416a859a0bcbb6f163f404d9a834d12596516bf6d6a988bd6e60a5008f223144fda3bd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-6ef5709d38051f89459357cfea1450d83c6ab179c7c35d021a03696a95416a859a0bcbb6f163f404d9a834d12596516bf6d6a988bd6e60a5008f223144fda3bd"' :
                                        'id="xs-injectables-links-module-UserModule-6ef5709d38051f89459357cfea1450d83c6ab179c7c35d021a03696a95416a859a0bcbb6f163f404d9a834d12596516bf6d6a988bd6e60a5008f223144fda3bd"' }>
                                        <li class="link">
                                            <a href="injectables/CreateUserUseCase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateUserUseCase</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GetUserByEmailUseCase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GetUserByEmailUseCase</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/CreateUserController.html" data-type="entity-link" >CreateUserController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/GetUserByEmailController.html" data-type="entity-link" >GetUserByEmailController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Account.html" data-type="entity-link" >Account</a>
                            </li>
                            <li class="link">
                                <a href="classes/AccountRepository.html" data-type="entity-link" >AccountRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthRepository.html" data-type="entity-link" >AuthRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAccountDto.html" data-type="entity-link" >CreateAccountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePaymentDto.html" data-type="entity-link" >CreatePaymentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorFilter.html" data-type="entity-link" >ErrorFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAccountByIdDto.html" data-type="entity-link" >GetAccountByIdDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginAuthDto.html" data-type="entity-link" >LoginAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Payment.html" data-type="entity-link" >Payment</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaymentRepository.html" data-type="entity-link" >PaymentRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/PrismaAccountMapper.html" data-type="entity-link" >PrismaAccountMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/PrismaPaymentMapper.html" data-type="entity-link" >PrismaPaymentMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/PrismaUserMapper.html" data-type="entity-link" >PrismaUserMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseAccountDto.html" data-type="entity-link" >ResponseAccountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseAuthDto.html" data-type="entity-link" >ResponseAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponsePaymentDto.html" data-type="entity-link" >ResponsePaymentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseUserDto.html" data-type="entity-link" >ResponseUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRepository.html" data-type="entity-link" >UserRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/viewModelAccount.html" data-type="entity-link" >viewModelAccount</a>
                            </li>
                            <li class="link">
                                <a href="classes/viewModelPayment.html" data-type="entity-link" >viewModelPayment</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CreateUserUseCase.html" data-type="entity-link" >CreateUserUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetUserByEmailUseCase.html" data-type="entity-link" >GetUserByEmailUseCase</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IAccount.html" data-type="entity-link" >IAccount</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPayment.html" data-type="entity-link" >IPayment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});