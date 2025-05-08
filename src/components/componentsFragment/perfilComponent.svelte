<script >
   let { formData } = $props();
   import {photoUrl} from "../../utils/data";
</script>

<div class="container p-5">
    <div class="card h-auto p-5">
        <section class="section about-section gray-bg" id="about">
            <div class="container">
                <div class="row align-items-center flex-row-reverse">
                    <div class="col-lg-6">
                        <div class="about-text go-to">
                            <h3 class="dark-color text-primary">
                                Perfil Basico
                            </h3>
                            <h6 class=" lead text-secondary">
                                Puesto Deseado: {formData?.puestoDeseado ||
                                    "Puesto Deseado"}
                            </h6>
                            <p>Descripcion.</p>
                            <p>{formData?.descripcion || "Aun no has puesto tu carrera"}</p>
                            <div class="row about-list">
                                <div class="col-md-6">
                                    <div class="media d-flex flex-column">
                                        <span>Codigo Alumno</span>
                                        <span>{formData.codigoAlumno}</span>
                                    </div>
                                    <div class="media">
                                        <span>Correo</span>
                                        <p>{formData.correo}</p>
                                    </div>
                                    <div class="media">
                                        <span>Telefono</span>
                                        <p>{formData.telefono}</p>
                                    </div>
                                    <div class="media">
                                        <span>Carreara</span>
                                        <p>
                                            {formData?.carrera || "Aun no has puesto tu carrera"}
                                        </p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="media">
                                        <span>Nombre</span>
                                        <p>{formData.nombre}</p>
                                    </div>
                                    <div class="media">
                                        <span>Apellidos</span>
                                        <p>
                                            {formData.apellidoPaterno +
                                                " " +
                                                formData.apellidoMaterno}
                                        </p>
                                    </div>
                                    <div class="media d-flex flex-column">
                                        <span>Curriculum</span>
                                        {#if formData?.curriculum}
                                            <small
                                                class="form-text text-muted"
                                            >
                                                <a
                                                    href={photoUrl +
                                                        formData?.curriculum}
                                                    target="_blank"
                                                    >Ver curriculum</a
                                                >
                                            </small>
                                        {/if}
                                    </div>
                                    <div class="media">
                                        <span>Estatus</span>
                                        <p>
                                            {formData?.estatus || "Aun no has puesto tu carrera"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="about-avatar">
                            <img
                                src={photoUrl + formData?.foto ||
                                    "https://bootdey.com/img/Content/avatar/avatar7.png"}
                                title="Foto de perfil"
                                alt="Foto de perfil"
                                class="img-fluid w-50"
                            />
                        </div>
                    </div>
                </div>
                <slot></slot>
            </div>
        </section>
    </div>
</div>